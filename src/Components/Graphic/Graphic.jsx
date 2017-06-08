import {h, render, Component} from 'preact';
import s from './Graphic.css';

export default class Graphic extends Component {
  handleClick(name) {
    alert(`Just clicked on ${name}!`);
  }

  getPersonas() {
    const {personas} = this.props;
    return personas.map((item, key) => {
        const {nombre, value} = item;
        const size = value * 3;
        const style = {
          width: size,
          height: size
        };

        return (
          <button className={s.circle} key={key} style={style}
                  onClick={this.handleClick.bind(false, nombre)}>{nombre}</button>
        )
      }
    );
  }

  render(props, state) {
    const personas = this.getPersonas();

    return (
      <div className={s.container}>
        {personas}
      </div>
    )
  }
}