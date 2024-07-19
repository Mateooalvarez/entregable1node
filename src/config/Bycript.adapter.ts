import {  compareSync, genSaltSync, hashSync } from "bcryptjs"


export const bcryptAdapter = {

  hash: (password: string) => {
<<<<<<< HEAD
    const salt = genSaltSync(12)
=======
    const salt = genSaltSync(12) // valor por defecto que tiene es 10
>>>>>>> 737b4962d993945ec92407bae68960c977134345
    return hashSync(password, salt)
  },

  compare: (bodyPassword: string, hashedPassword: string): boolean => {
    return compareSync(bodyPassword, hashedPassword)
  }

<<<<<<< HEAD
}
=======
}
>>>>>>> 737b4962d993945ec92407bae68960c977134345
