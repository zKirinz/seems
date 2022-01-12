import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Button, Input } from '@mui/material'

import styles from './Counter.module.css'
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from './counterSlice'

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')

    const incrementValue = Number(incrementAmount) || 0

    return (
        <div>
            <div className={styles.row}>
                <Button
                    variant="contained"
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </Button>
                <span className={styles.value}>{count}</span>
                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </Button>
            </div>
            <div className={styles.row}>
                <Input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <Button
                    variant="outlined"
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </Button>
                <Button
                    variant="outlined"
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </Button>
                <Button
                    variant="outlined"
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </Button>
            </div>
        </div>
    )
}
