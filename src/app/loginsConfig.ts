import {MicrosoftOptions} from "@abacritt/angularx-social-login/providers/microsoft-login-provider";

export const googleConfig = {scope: 'email', ux_mode: 'redirect', response_type:'code'};

export const microsoftConfig: MicrosoftOptions ={
    redirect_uri: window.origin,
    scopes:[
        'email'
    ]
}