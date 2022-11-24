import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Loader } from '@ahaui/react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { InlineError } from 'components/Common';
import { ReactComponent as Logo } from 'assets/images/logo-only.svg';
import { useTypedDispatch } from 'hooks';
import { IFormSignUpInputs } from 'types/form';
import {
  register as myRegister,
  login,
  getUserInfo,
} from 'redux/actions/user.action';
import { EMAIL_REGEX, NAME_REGEX } from 'constants/form';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignUpInputs>({ mode: 'onChange' });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const handleLoginSubmit = (data: IFormSignUpInputs) => {
    if (data.email && data.password && data.name) {
      setIsLoading(true);
      const { email, name, password } = data;
      dispatch(myRegister(name, email, password))
        .then(() => dispatch(login(email, password)))
        .then(() => dispatch(getUserInfo()))
        .then(() => {
          setIsLoading(false);
          navigate('/');
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Form
      className={classNames(
        styles.signUp,
        'u-backgroundWhite u-paddingVerticalMedium u-paddingHorizontalMedium u-positionAbsolute u-positionCenter u-flex u-flexColumn u-shadowMedium u-roundedMedium',
      )}
    >
      <Logo
        width={40}
        height={40}
        className="u-marginLeftAuto u-marginRightAuto"
      />
      <h1 className="u-textCenter u-marginTopExtraSmall u-marginBottomMedium u-text800">
        Register to Hello
      </h1>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Your name"
          {...register('name', {
            required: 'Name is required',
            maxLength: 30,
            pattern: NAME_REGEX,
          })}
        />
        {errors.name?.type === 'pattern' && (
          <InlineError>
            Name should not contain any special characters, numbers
            and have more than one space between words
          </InlineError>
        )}

        {errors.name?.type === 'required' && (
          <InlineError>Please enter your name</InlineError>
        )}
        {errors.name?.type === 'maxLength' && (
          <InlineError>
            Maximum length of name is 30 characters
          </InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: EMAIL_REGEX,
            maxLength: 30,
          })}
        />

        {errors.email?.type === 'required' && (
          <InlineError>Please enter your email</InlineError>
        )}
        {errors.email?.type === 'pattern' && (
          <InlineError>Email is invalid</InlineError>
        )}

        {errors.email?.type === 'maxLength' && (
          <InlineError>
            Maximum length of email is 30 characters
          </InlineError>
        )}
      </Form.Group>

      <Form.Group sizeControl="large">
        <Form.Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: 6,
          })}
        />

        {errors.password?.type === 'required' && (
          <InlineError>Please enter your password</InlineError>
        )}

        {errors.password?.type === 'minLength' && (
          <InlineError>
            Password should be at least 6 characters
          </InlineError>
        )}
      </Form.Group>

      <Link
        to="/login"
        className="u-marginLeftAuto u-marginBottomSmall u-textPrimary hover:u-textPrimary hover:u-textUnderline"
      >
        I already have an account
      </Link>

      {!isLoading && (
        <Button
          variant="primary"
          size="large"
          className="u-backgroundPrimary hover:u-background"
          onClick={handleSubmit(handleLoginSubmit)}
        >
          <Button.Label>Register</Button.Label>
        </Button>
      )}
      {isLoading && <Loader className="u-marginAuto" />}
    </Form>
  );
};

export default SignUp;
