import { cpf } from 'cpf-cnpj-validator';
import { UserErrors } from '../errors/user_errors/errors';

export const validateCPF = (value: string): boolean => {

    if (!cpf.isValid(value)) {
        return false
    }

    return true
}