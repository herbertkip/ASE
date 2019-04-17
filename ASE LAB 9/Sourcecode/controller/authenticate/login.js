var login =function(user,password){

    console.log(user,password)
    if(user==="herbert@gmail.com" && password==="123pass"){
        return true;
    }
    else{
        return false;
    }
}

module.exports=login;