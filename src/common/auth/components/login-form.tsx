import React, { useState, useMemo, MouseEventHandler } from 'react';
import { TabContent, TabPane, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { EyeOff, Eye } from 'react-feather';
import { IInputHandle } from '@common/dtos/input-handle';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Show } from '@common/show';
import { AuthRequest, ILogin } from '@services/auth.request';
import cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Toggle from "@atlaskit/toggle";

interface IErrorLogin {
  username: string[];
  password: string[];
  campusId: string[];
}

interface IPropsLoginForm {
  onResetPassword?: Function,
  onSignIn?: Function
}

export const LoginForm = (props: IPropsLoginForm) => {

  const [loading, setLoading] = useState(false);
  const [errors] = useState<IErrorLogin | any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<ILogin>({
    username: "twd2206",
    password: "nomeacuerdo73",
    campusId: 1,
    rememberToken: false
  });

  const { mode } = useSelector((state: RootState) => state.screen);
  const { client } = useSelector((state: RootState) => state.client);

  const authRequest = AuthRequest();

  const togglePassword = () => setShowPassword((prev) => (!prev))

  const componentTooglePassword = useMemo(() => {
    let propsPassword = { onClick: togglePassword, className: "cursor-pointer" };
    return showPassword ? <EyeOff {...propsPassword} /> : <Eye {...propsPassword} />
  }, [showPassword])

  const handleInput = ({ name, value }: IInputHandle): void => {
    setForm((prev: ILogin) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true);
    await authRequest.signIn(form)
      .then(({ data }: any) => {
        cookies.set('AccessToken', data?.accessToken);
        if (typeof props.onSignIn == 'function') {
          props.onSignIn(data);
        }
      }).catch(() => {
        toast.error(`Las credenciales de acceso son incorrectas`);
        setLoading(false);
      })
  }

  const canSubmit: boolean = useMemo(() => {
    return (form?.username && form?.password) as any;
  }, [form]);

  return (
    <div className={`login-main ${mode == 'xs' ? 'block' : ''}`}
      style={{ width: "100%" }}
    >
      <TabContent activeTab={"jwt"} className="content-login">
        <TabPane className="fade show" tabId={"jwt"}>
          <Form className="theme-form">
            <h4 className='text-center mb-4'>{'Polleria D Marianito  Chicken'}</h4>

            {/* <FormGroup className="mb-0">
              <Label className="col-form-label">Sede</Label>
              <BusinessToCampusesSelect
                name='campusId'
                value={form?.campusId}
                onChange={(obj) => handleInput(obj)}
              />
              <label>{errors?.campusId?.[0] || ''}</label>
            </FormGroup> */}

            <FormGroup className="mb-0">
              <Label className="col-form-label">Usuario</Label>
              <Input className={`form-control block`}
                name="username"
                value={form.username || ''}
                // onChange={(e) => handleInput(e.target)}
                placeholder="example@gmail.com"
                disabled={loading}
              />
              <label>{errors?.username?.[0] || ''}</label>
            </FormGroup>

            <FormGroup className="mb-0" style={{ position: 'relative' }}>
              <Label className="col-form-label">Contraseña</Label>
              <Input className={`form-control block`}
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password || ''}
                // onChange={(e) => handleInput(e.target)}
                placeholder="*********"
                disabled={loading}
              />

              <div className="show-hide pt-2 block">
                {componentTooglePassword}
              </div>

              <label>{errors?.password?.[0] || ''}</label>
            </FormGroup>

            <FormGroup className="mb-4">
              <div className='text-left'>
                <span className="text-muted"
                  style={{ position: "relative", bottom: "4px" }}
                >
                  Recordar Sesión
                </span>
                <Toggle name="rememberToken"
                  isDisabled={loading}
                  isChecked={form?.rememberToken || false}
                  onChange={({ target }) => handleInput({
                    name: target.name,
                    value: target.checked
                  })}
                />
              </div>
            </FormGroup>

            <div className="form-group mb-0 mt-2">
              <Button color="primary"
                className="btn-block"
                disabled={!canSubmit || loading}
                onClick={handleSave}
                style={{
                  paddingTop: '0.8em',
                  paddingBottom: '0.8em'
                }}
              >
                Entrar
              </Button>
            </div>

            <Show condition={typeof props.onResetPassword == 'function'}>
              <div className="form-group mb-0 text-right mt-3">
                <div className="checkbox ml-3"></div>
                <a href="#" onClick={props.onResetPassword as MouseEventHandler}>
                  Recuperar cuenta
                </a>
              </div>
            </Show>
          </Form >
        </TabPane >
      </TabContent >
    </div >
  )
}