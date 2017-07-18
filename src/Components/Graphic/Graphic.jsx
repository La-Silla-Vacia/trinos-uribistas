import {h, render, Component} from 'preact';
import cn from 'classnames';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({html: true});

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

    this.setState({activeGroupId: id, activeGroup});
    if (twttr) {
      console.log("rendering twitter");
      setTimeout(() => {
        twttr.widgets.load()
      }, 50);
    } else {
      console.log("No twitter script active");
    }
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
        <div className={s.personas}>
          <div className={s.inactivePersonas}>
            {inactivePersonas}
          </div>
          <aside className={s.sidebar}>
            <ul className={s.conventions}>
              <li><span className={s.centro}/>Centro Democrático</li>
              <li><span className={s.conservador}/>Conservador</li>
              <li><span className={s.undefined}/>Sin definir</li>
            </ul>
          </aside>
        </div>

        <div className={s.groupSelect}>
          <button
            className={cn(s.button, {[s.active]: activeGroupId === 0})}
            onClick={this.handleButtonClick.bind(this, 0)}
          >
            Resetear vista
          </button>
          {groupOptions}
        </div>

        <div className={s.personas}>
          <div className={s.inner}>
            <div className={s.activePersonas}>
              {(!activeGroupId) ? '' : activePersonas}
            </div>
            {description}
          </div>
          <aside className={s.sidebar}>
            <div>
              <button
                className={cn(s.button, {[s.active]: activeGroupId === 0})}
                onClick={this.handleButtonClick.bind(this, 0)}
              >
                Resetear vista
              </button>
              {groupOptions}
            </div>
          </aside>
        </div>
      </div>
    )
  }
}