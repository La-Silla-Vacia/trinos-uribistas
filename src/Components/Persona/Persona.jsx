import {h, render, Component} from 'preact';
import s from './Persona.css';

export default class Persona extends Component {
  render(props, state) {
    const {nombre, foto, partido, color, cargo } = props;
    const style = {
      backgroundImage: `url(${foto})`,
      borderColor: color
    };

    return (
      <div className={s.container} style={style}>
        <div className={s.tooltip}>{nombre}
          <div className={s.cargo}> <strong>{cargo}</strong> <br /> {partido}</div>
        </div>
      </div>
    )
  }
}