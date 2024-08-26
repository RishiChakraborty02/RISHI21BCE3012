function movevalidator(board,move){
    if(board[move] === ''){
        return true;
    }
    return false;
}

export default movevalidator;