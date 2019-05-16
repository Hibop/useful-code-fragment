function looseCurry(fn,arity = fn.length) {
	return (function nextCurried(prevArgs){
		return function curried(...nextArgs){
			var args = prevArgs.concat( nextArgs );

			if (args.length >= arity) {
				return fn( ...args );
			}
			else {
				return nextCurried( args );
			}
		};
	})( [] );
}

// 箭头函数式
const looseCurry = (fn, arity = fn.length, nextCurried) => 
  (nextCurried = prevArgs => 
    (...nextArgs) => {
      const args =  prevArgs.concat(nextArgs);
      return args.length >= arity ? fn(...args) : nextCurried(args)
    }
  )([])


// Test 
var fn  =  (a1, a2, z3) => (a1 + a2 + a3);
looseCurry(fn)

