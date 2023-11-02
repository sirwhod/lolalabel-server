import { CK_User } from "@prisma/client";

export interface CKAuthResponse {
  user: { 
    USid: string;
    USname: string;
    USusername: string;
    USregistration: string;
    USstatus: boolean;
    USidProfile: string;
    USidStore: string;
  }, 
  CKtoken: string
}

export interface CKResposeUser {
  USid: string;
  USname: string;
  USusername: string;
  USregistration: string;
  USstatus: boolean;
  USidProfile: string;
  USidStore: string;
}

export interface IPCKUserRepository {
  create(
    USname: string,
    USusername: string,
    USpassword: string,
    USregistration: string,
    USidProfile: string,
    USidStore: string
  ): Promise<CK_User>
  auth(
    USusername: string, 
    USpassword: string
  ): Promise<CKAuthResponse>
  find(USusername: string): Promise<CKResposeUser>
  findMany(): Promise<CKResposeUser[]>
  alter(
    USid: string,
    USidProfile: string,
    USidStore: string,
    USstatus: boolean
  ): Promise<CKResposeUser>
  alterPassword(
    USid: string,
    USpassword: string
  ): Promise<CKResposeUser>
}