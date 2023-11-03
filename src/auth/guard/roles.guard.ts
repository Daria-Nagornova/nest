import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Role} from "../../user/role.enum";
import {ROLES_KEY} from "../decorators/roles.decorators";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const user = context.switchToHttp().getRequest();
        const jwt = user.headers.authorization.replace('Bearer ', '');
        const userItem = this.jwtService.decode(jwt);
        const userInfo = this.userService.findOne(userItem['email']);
        const result = await userInfo.then();

        return requiredRoles.some((role) => result.role.toString() == role);

    }
}