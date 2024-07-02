import { Repairs } from "../../data"
import { UpdateRepairDto } from "../../domain/dtos/repairs/repairs-update-dto";
import { CustomError } from "../../domain/errors/custom-errors";


enum RepairsStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class repairsService {

    constructor() {

    }

    async createRepair(repairData: any) {
        const repair = new Repairs()


        repair.date = repairData.date;
        repair.status = RepairsStatus.PENDING;
        repair.user_id = repairData.usrrId;

        try {
            return await repair.save()

        } catch (error) {
            console.log(error)
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
        const repairs = await Repairs.findOne({
            where: {
                status: RepairsStatus.PENDING
            }
        })
        if (!id) {
            throw CustomError.notFound(`videogame with id ${id} not found`)
        }
        return repairs
    }

    async updateRepair(userData: UpdateRepairDto, id: number) {
     const repair = await this.findOneRepair(id)
     if (Object.values(RepairsStatus).includes(userData.status.trim() as RepairsStatus)) {
        repair!.status = userData.status.trim() as RepairsStatus;
    } else {
        throw CustomError.badRequest(`Invalid repair status: ${userData.status}`);
    }     try {
        return await repair?.save()
     } catch (error) {
        throw CustomError.internalServer("Something went wrong")
     }
    }

    async deleteRepair(id: number){
        const repair = await this.findOneRepair(id);

        repair!.status = RepairsStatus.CANCELLED
        try {
            return repair?.save()
        } catch (error) {
            throw CustomError.internalServer("Something went wrong")
        }
    }
}