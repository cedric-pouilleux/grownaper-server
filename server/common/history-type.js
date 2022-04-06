class History {
    add(message){
        return {
            date: new Date(),
            action: 'ADD',
            message: message,
        };
    }
    edit(message){
        return {
            date: new Date(),
            action: 'EDIT',
            message: message,
        };
    }
    important(message){
        return {
            date: new Date(),
            action: 'IMPORTANT',
            message: message,
        };
    }
    service(message){
        return {
            date: new Date(),
            action: 'SERVICE',
            message: message,
        };
    }
}

export default new History();