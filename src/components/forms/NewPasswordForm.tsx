import { useState } from "react";
import Input from "./Input"

import eyeOff from '../../assets/icon/eye-off.svg'


const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form >
            <div className="flex flex-col ">
                <div className="flex flex-col  gap-y-7">
                    <div className="relative">
                        <Input placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password"
                        // register={register("password")} 
                        // error={errors.password?.message} 
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOff} alt="" />
                            ) : (

                                <img src={eyeOff} alt="" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <Input placeholder="Confirmar contraseña" type={showPassword ? "text" : "password"} name="confirm-password"
                        // register={register("password")} 
                        // error={errors.password?.message} 
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <img src={eyeOff} alt="" />
                            ) : (

                                <img src={eyeOff} alt="" />
                            )}
                        </button>
                    </div>


                </div>


                <button
                    type="submit"
                    // disabled={!isValid}
                    className='block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2]'>
                    Cambiar contraseña
                </button>


            </div>


        </form>
    )
}

export default NewPasswordForm
