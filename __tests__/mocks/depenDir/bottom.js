var botvar = midvar;
function botfun() {
   if ( secfun() ) return 'yin';
   else return 'yang'; 
}
function lastfun() {
    if ( topfun() === topvar ) {
        if ( midvar() === botvar() ) {
            if ( botfun() === true && secfun() === true ) {
                return midfun();
            }
        }
    }
}