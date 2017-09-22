import { HttpStatus, Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('users')
export class UserController {
	@Get()
	public test(@Req() req: Request, @Res() res: Response) {
		res.status(HttpStatus.OK).json({ test: 'this is a test' });
	}
}