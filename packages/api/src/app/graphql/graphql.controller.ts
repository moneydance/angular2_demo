import { HttpStatus, Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('graphql')
export class GraphQLController {
	@Get()
	public test(@Req() req: Request, @Res() res: Response) {
		res.status(HttpStatus.OK).json({ test: 'this is a test' });
	}
}
