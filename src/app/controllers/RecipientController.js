import Recipient from '../models/Recipient';
import jwt from 'jsonwebtoken';
import configAuth from '../../config/auth';
import * as Yup from 'yup';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.number().required()
        });

        if(!( await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails'
            });
        }

        const recipientExists = await Recipient.findOne({
            where: { 
                cep: req.body.cep 
            }
        })

        if(recipientExists) {
            return res.status(400).json({
                error: 'Recipient already exists'
            });
        }
        
        const { id, name, cep } = await Recipient.create(req.body);        
    
        return res.json({
            recipient: {
                id,
                name,
                cep
            },
            token: jwt.sign({ id }, configAuth.secret, {
                expiresIn: configAuth.expiresIn
            })
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            rua: Yup.string(),
            numero: Yup.number(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.number().required()
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'Validation fails'
            });
        }

        const { cep } = req.body;

        const recipient = await Recipient.findByPk(req.userId);

        if(cep !== recipient.cep) {
            const recipientExists = await Recipient.findOne({
                where: { cep }
            });

            if(recipientExists) {
                return res.status(401).json({
                    error: 'Recipient already exists'
                });
            }
        }

        const { id, name } = await  recipient.update(req.body);
        
        return res.json({
            id,
            name,
            cep
        });
    }
}

export default new RecipientController();