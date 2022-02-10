import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type ExpressMiddlewareFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function ValidateRequestObject<DTO>(dto: new (args: Partial<DTO>) => DTO): ExpressMiddlewareFn {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const dtoClass: DTO = plainToClass(
            dto,
            {
                params: Object.keys(req.params).length ? req.params : {},
                query: Object.keys(req.query).length ? req.query : {},
                body: Object.keys(req.body).length ? req.body : {}
            },
            {
                excludeExtraneousValues: false,
                enableImplicitConversion: false
            }
        );

        const dtoClassInitialized: DTO = new dto(dtoClass);

        const errors: ValidationError[] = await validate(dtoClassInitialized as unknown as Record<string, unknown>);

        if (errors.length > 0) {
            return res.status(403).json({ error: 'Invalid DTO: ' + errors.join(', ') });
        }

        return next();
    };
}
