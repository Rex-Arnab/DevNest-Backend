function foo(){
    return foo(console.log("a"));
}

foo();

//! ERROR
//!  Range Error: Maximum call stack size exceeded