interface PartyMembersModel{
    uid:string;
    joined_on:string;
}

export interface PartyModel{
    id?:string;
    name?:string;
    join_code?:string;
    description?:string;
    end_date?:string;
    created_by:string;
    created_on?:string;
    members?:PartyMembersModel[];
    
}