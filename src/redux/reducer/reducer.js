const initial_state = {
    id: 1, strsrch: '', user: ''
}

export default (asd = initial_state, action) => {
    switch (action.type) {
        case 'click':
            console.log(action.payload);
            return action.payload
        case 'search':
            console.log(action.payload);
            return action.payload
        case 'transaction':
            console.log(action.payload);
            return action.payload
        default:
            return asd
    }
}
