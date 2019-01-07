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
      return arg.length >= arity ? fn(...args) : nextCurried(args)
    }
  )([])

