interface PartyMembersModel{
    uid:string;
    displayName:string;
    joined_on:string;
}
export interface SongsModel{
    song_name:string;
    song_author:string;
    added_on:string;
    added_by_displayName:string;
    played:boolean;
}

export interface PartyModel{
    id?:string;
    name?:string;
    join_code?:string;
    description?:string;
    end_date?:string;
    created_by:string;
    created_on?:string;
    created_by_displayName?:string;
    members?:any[];
    songs?:SongsModel[];
    open?:Boolean;
}