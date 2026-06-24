import { cpf } from 'cpf-cnpj-validator';

export const validateCPF = (value: string): boolean => {

    if (!cpf.isValid(value)) {
        return false
    };

    return true;
};