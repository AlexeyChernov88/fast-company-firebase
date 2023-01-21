import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfesions";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegistorForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    const [errors, setErrors] = useState({});
    const { qualities } = useQuality();
    const { professions } = useProfession();
    const { signUp } = useAuth();

    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };

    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };

    const professionsList = professions.map((professionName) => ({
        label: professionName.name,
        value: professionName._id
    }));

    // const qualitiesList = Object.keys(data).map((optionName) => ({
    //     value: data[optionName]._id,
    //     label: data[optionName].name,
    //     color: data[optionName].color
    // }));

    const qualitiesList = qualities.map((optionName) => ({
        value: optionName._id,
        label: optionName.name,
        color: optionName.color
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 смволов",
                valeo: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 смволов",
                valeo: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите свою проффесию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без потверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            console.log(error);
            setErrors(error);
        }

        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professionsList}
                name="profession"
                label="Выберете вашу профессию"
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
            />
            <RadioField
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                label="Выберите ваш пол"
            />
            <MultiSelectField
                onChange={handleChange}
                defaultValue={data.qualities}
                options={qualitiesList}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegistorForm;
