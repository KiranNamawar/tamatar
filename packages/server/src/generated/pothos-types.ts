/* eslint-disable */
import type { Prisma, Session, Otp, User } from "./prisma/index.js";
export default interface PrismaTypes {
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Otp: {
        Name: "Otp";
        Shape: Otp;
        Include: Prisma.OtpInclude;
        Select: Prisma.OtpSelect;
        OrderBy: Prisma.OtpOrderByWithRelationInput;
        WhereUnique: Prisma.OtpWhereUniqueInput;
        Where: Prisma.OtpWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "sessions" | "otps";
        ListRelations: "sessions" | "otps";
        Relations: {
            sessions: {
                Shape: Session[];
                Name: "Session";
                Nullable: false;
            };
            otps: {
                Shape: Otp[];
                Name: "Otp";
                Nullable: false;
            };
        };
    };
}