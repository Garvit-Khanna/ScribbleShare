import React, { useRef, useState, useEffect } from 'react';

export default function VerificationInput({ callback, reset, isLoading,handleResendCode }) {
    const [code, setCode] = useState('');

    // Refs to control each digit input element
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            ref.current.value = '';
        });
        inputRefs[0].current.focus();
        setCode('');
    }

    // Call our callback when code = 6 chars
    useEffect(() => {
        if (code.length === 6) {
            if (typeof callback === 'function') callback(code);
            // resetCode();
        }
    }, [code]);

    // Listen for external reset toggle
    useEffect(() => {
        resetCode();
    }, [reset]); //eslint-disable-line

    // Handle input
    function handleInput(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        // Update code state with single digit
        const newCode = [...code];
        newCode[index] = input.value;

        setCode(newCode.join(''));

        input.select();

        if (input.value === '') {
            // If the value is deleted, select previous input, if exists
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (nextInput) {
            // Select next input on entry, if exists
            nextInput.current.select();
        }
    }

    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
    }

    // Handle backspace key
    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 6) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };

    return (
        <div>
            <h3 className='mb-4'>Enter the verfication code...</h3>
            <div className="flex gap-2 relative m-auto justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                        className="text-2xl ring-yellow-400 ring-2 w-16 flex p-2 text-center"
                        key={index}
                        type="text"
                        maxLength={1}
                        onChange={(e) => handleInput(e, index)}
                        ref={inputRefs[index]}
                        autoFocus={index === 0}
                        onFocus={handleFocus}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        disabled={isLoading}
                    />
                ))}
            </div>
            <div className='flex gap-4 my-4 justify-center'>
                <button className='w-2/5 h-10 pointer rounded-lg border-2 border-yellow-500 text-xl hover:ring-4 hover:ring-yellow-300' onClick={resetCode}>Reset</button>
                <button className='w-2/5 h-10 pointer rounded-lg border-2 border-yellow-500 text-xl hover:ring-4 hover:ring-yellow-300' onClick={handleResendCode}>Resend new code</button>
            </div>
        </div>
    );
}