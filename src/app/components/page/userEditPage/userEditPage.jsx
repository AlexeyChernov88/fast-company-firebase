import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";
import { useProfession } from "../../../hooks/useProfesions";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = ({ userId }) => {
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const { isLoading: isLoadingProfession, professions } = useProfession();
    const { qualities, isLoading: isLoadingQuality, getQuality } = useQuality();
    const [dataUser, setDataUser] = useState();
    const [errors, setErrors] = useState({});
    const [isLoadingPage, setIsLoading] = useState(true);

    // const getQualities = (qualities) => {
    //     return qualities.map((q) => q.value);
    // };

    const professionList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const qualitiesList = qualities.map((q) => ({
        value: q._id,
        label: q.name
    }));

    useEffect(() => {
        if (
            !dataUser &&
            !isLoadingQuality &&
            !isLoadingProfession &&
            currentUser
        ) {
            setDataUser({
                ...currentUser,
                qualities: currentUser.qualities.map((id) => ({
                    label: getQuality(id)?.name,
                    value: id
                }))
            });
        }
    }, [dataUser, isLoadingQuality, isLoadingProfession, currentUser]);

    useEffect(() => {
        if (dataUser && isLoadingPage) {
            setIsLoading(false);
        }
    }, [dataUser]);

    console.log(dataUser);

    const handleChange = (target) => {
        setDataUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isNotContainDigit: {
                message: "Имя не может содержать цифры"
            },
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите свою проффесию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [dataUser]);
    const validate = () => {
        const errors = validator(dataUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUser({
                ...dataUser,
                qualities: dataUser.qualities.map((q) => q.value)
            });
            console.log({
                ...dataUser,
                qualities: dataUser.qualities.map((q) => q.value)
            });
        } catch (error) {
            setErrors(error);
        } finally {
            history.replace(`/users/${userId}`);
        }
    };

    return (
        <div className="container mt-5">
            {!isLoadingPage ? (
                <div className="container mt-5">
                    <BackButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={dataUser.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={dataUser.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    onChange={handleChange}
                                    options={professionList}
                                    name="profession"
                                    label="Выберете вашу профессию"
                                    defaultOption="Choose..."
                                    error={errors.profession}
                                    value={dataUser.profession}
                                />
                                <RadioField
                                    onChange={handleChange}
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={dataUser.sex}
                                    name="sex"
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    onChange={handleChange}
                                    defaultValue={dataUser.qualities}
                                    options={qualitiesList}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                "Loading"
            )}
        </div>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string
};

export default UserEditPage;
