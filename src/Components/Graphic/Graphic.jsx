import {h, render, Component} from 'preact';
import cn from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import s from './Graphic.css';
import Persona from "../Persona";

export default class Graphic extends Component {
  constructor() {
    super();

    this.state = {
      activeGroupId: 0,
      activeGroup: false
    }
  }

  getInactivePersonas() {
    const {activeGroupId} = this.state;
    const {personas} = this.props;
    return personas.map((item) => {
        if (item.grupo.indexOf(activeGroupId) === -1)
          return (
            <Persona {...item} key={item.id}/>
          )
      }
    );
  }

  getActivePersonas() {
    const {activeGroupId} = this.state;
    const {personas} = this.props;
    return personas.map((item) => {
        if (item.grupo.indexOf(activeGroupId) !== -1)
          return (
            <Persona {...item} key={item.id}/>
          )
      }
    );
  }

  handleButtonClick(id) {
    const {grupos} = this.props;
    let activeGroup;
    grupos.map((group) => {
      if (group.id === id) activeGroup = group;
    });
    console.log(activeGroup);
    this.setState({activeGroupId: id, activeGroup});
  }

  getGroupOptions() {
    const {activeGroupId} = this.state;
    const {grupos} = this.props;
    return grupos.map((group) => {
      const {nombre, id} = group;
      const active = (id === activeGroupId);
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

  getDescription() {
    const {activeGroup} = this.state;
    if (!activeGroup) return;
    return (
      <div className={s.description}>
        <h2>{activeGroup.nombre}</h2>
        <div dangerouslySetInnerHTML={{__html: md.render(String(activeGroup.texto))}}/>
      </div>
    )
  }

  render(props, state) {
    const {activeGroupId} = state;
    const inactivePersonas = this.getInactivePersonas();
    const activePersonas = this.getActivePersonas();
    const groupOptions = this.getGroupOptions();
    const description = this.getDescription();
    return (
      <div className={s.container}>
        <div className={s.inner}>
          <div className={s.personas}>
            <div className={s.inactivePersonas}>
              {inactivePersonas}
            </div>
            <div className={s.activePersonas}>
              {activePersonas}
            </div>
          </div>
          {description}
        </div>
        <div className={s.groupSelect}>
          <button
            className={cn(s.button, {[s.active]: activeGroupId === 0})}
            onClick={this.handleButtonClick.bind(this, 0)}
          >
            Show all
          </button>
          {groupOptions}
        </div>
      </div>
    )
  }
}