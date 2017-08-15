import {Client} from '../api/Client';
import {actions} from 'react-redux-form';
import {State} from '../store/reducer';
import {Dispatch} from 'redux';
import {inject, injectable} from 'inversify';

@injectable()
export class Effects {
  constructor(
    private api: Client,
    @inject('dispatch') private dispatch: Dispatch<State>,
  ) {
  }

  async login(user: string, password: string): Promise<void> {
    try {

      await this.dispatch<Promise<void>, undefined>(
        actions.submitFields(
          'login.model',
          this.api.login(user, password),
        ),
      );
    } catch (e) {
      this.dispatch(actions.setErrors('login.model', e.message));
    }
  }

}