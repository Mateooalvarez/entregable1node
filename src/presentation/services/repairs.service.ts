import { protectAccountOwner } from "../../config/validate-owner";
import { Repairs } from "../../data"
import { CreateRepairsDto } from "../../domain/dtos/repairs/repairs-create-dto";
import { UpdateRepairDto } from "../../domain/dtos/repairs/repairs-update-dto";
import { CustomError } from "../../domain/errors/custom-errors";
import { UserService } from "./user.service";


enum RepairsStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class repairsService {
    public readonly UserService: UserService;

    constructor() {
        this.UserService = new UserService()
    }

    async createRepair(createRepairsDto: CreateRepairsDto) {

        const userPromise = this.UserService.findOneUser(createRepairsDto.userId)

        const [user] = await Promise.all([userPromise])

        const repair = new Repairs()
        repair.date = (createRepairsDto.date ? new Date(createRepairsDto.date) : new Date()).toISOString();
        repair.status = RepairsStatus.PENDING;
        if (!user) {
            throw CustomError.notFound(`User with id ${createRepairsDto.userId} not found`)
        }
        repair.user = user;


        try {
            return await repair.save()

        } catch (error) {
            throw CustomError.internalServer("Something went very wrong!")
        }
    }

    async findAllRepairs() {
        try {
            return await Repairs.find({
                where: {
                    status: RepairsStatus.PENDING
                }
            })

        } catch (error) {
            throw CustomError.internalServer("Something went very wrong!")
        }
    }

    async findOneRepair(id: number) {
        if (!id || typeof id !== 'number') {
            throw CustomError.badRequest(`invalid id: ${id}`)
        }

        const repair = await Repairs.findOne({
            where: {
                id: id,
                status: RepairsStatus.PENDING
            },
            relations: ['user']
        })

        if (!repair) {
            throw CustomError.notFound(`repair with id ${id} not found`)
        }

        if (!id) {
            throw CustomError.notFound(`videogame with id ${id} not found`)
        }
        return repair
    }

    async updateRepair(userData: UpdateRepairDto, id: number) {
        const repair = await this.findOneRepair(id)
        if (Object.values(RepairsStatus).includes(userData.status.trim() as RepairsStatus)) {
            repair!.status = userData.status.trim() as RepairsStatus;
        } else {
            throw CustomError.badRequest(`Invalid repair status: ${userData.status}`);
        } try {
            return await repair?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went wrong")
        }
    }

    async deleteRepair(id: number, userSessionId: number) {
        const repair = await this.findOneRepair(id);

        const isOwner = protectAccountOwner(+repair.user.id, userSessionId)
        if (!isOwner) throw CustomError.unAuthorized('You are not the owner of this purchase')

        repair!.status = RepairsStatus.CANCELLED
        try {
            return repair?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went wrong")
        }
    }
}
