define({
    pipe: (...functions) => initialValue => [...functions].reduceRight((value, fn) => fn(value), initialValue)
});