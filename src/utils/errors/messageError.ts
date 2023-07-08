
export const messageError = (error:any)=>{
    return (error as Error).message;
}