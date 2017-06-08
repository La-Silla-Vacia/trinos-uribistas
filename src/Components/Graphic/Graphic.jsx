import {h, render, Component} from 'preact';
import cn from 'classnames';
import s from './Graphic.css';
import Persona from "../Persona";

export default class Graphic extends Component {
  constructor() {
    super();

    this.state = {
      activeGroup: 0
    }
  }

  getInactivePersonas() {
    const {activeGroup} = this.state;
    const {personas} = this.props;
    return personas.map((item) => {
        if (item.grupo.indexOf(activeGroup) === -1)
        return (
          <Persona {...item} key={item.id}/>
        )
      }
    );
  }

  getActivePersonas() {
    const {activeGroup} = this.state;
    const {personas} = this.props;
    return personas.map((item) => {
        if (item.grupo.indexOf(activeGroup) !== -1)
          return (
            <Persona {...item} key={item.id}/>
          )
      }
    );
  }

  handleButtonClick(id) {
    this.setState({activeGroup: id});
  }

  getGroupOptions() {
    const {activeGroup} = this.state;
    const {grupos} = this.props;
    return grupos.map((group) => {
      const {nombre, id} = group;
      const active = (id === activeGroup);
      return (
        <button
          className={cn(s.button, {[s.active]: active})}
          onClick={this.handleButtonClick.bind(this, id)}
          key={id}
        >
          {nombre}
        </button>
      )
    });
  }

  render(props, state) {
    const inactivePersonas = this.getInactivePersonas();
    const activePersonas = this.getActivePersonas();
    const groupOptions = this.getGroupOptions();
    return (
      <div className={s.container}>
        <div className={s.personas}>
          <div className={s.inactivePersonas}>
            {inactivePersonas}
          </div>
          <div className={s.activePersonas}>
            {activePersonas}
          </div>
        </div>
        <div className={s.groupSelect}>
          <div>
            {groupOptions}
          </div>
        </div>
      </div>
    )
  }
}