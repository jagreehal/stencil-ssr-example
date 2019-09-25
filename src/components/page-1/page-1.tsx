import { Component, Prop, State, h, Watch } from '@stencil/core';

export interface Todo {
  title: string;
  completed: boolean;
}

@Component({
  tag: 'page-1',
  styleUrl: 'page-1.css',
  shadow: true
})
export class Page1 {
  @Prop()
  first: string = 'first';
  @Prop()
  last: string = 'last';

  @State()
  cwl: string = 'NOT CALLED';

  @State()
  cdl: string = 'NOT CALLED';

  @Prop()
  dataFromServer: string;

  @Prop()
  initialCount: number;

  @State()
  data: string = this.dataFromServer;

  @State()
  count: number = this.initialCount || 100;
  async click() {
    console.log('click', this.count);
    this.count++;
  }

  @Prop()
  todos: string;
  @State() _todos: Todo[] = [];

  @Watch('todos')
  parseTodos(newValue: string) {
    if (newValue) {
      try {
        this._todos = JSON.parse(newValue);
      } catch (error) {
        console.error('Could not parse todos', error, newValue);
      }
    }
  }

  async componentWillLoad() {
    this.parseTodos(this.todos);
    this.cwl = `in componentWillLoad - ${Date()} - window:${window} - fetch:${fetch}`;
    if (!this.data && fetch) {
      const response = await fetch('https://swapi.co/api/people/1');
      console.log(response);
      const d = await response.json();
      console.log('data', d);
      this.data = d.name;
    }
  }
  async componentDidlLoad() {
    this.cdl = `called componentDidlLoad - ${Date()}`;
  }
  render() {
    const todosList = this._todos.map(todo => (
      <div class="todo-item">{todo.title}</div>
    ));

    return (
      <div>
        <h3>Prop Data</h3>
        I'm Page #1 - {this.first} {this.last}
        <h3>componentWillLoad</h3>
        <div>{this.cwl}</div>
        <h3>componentDidlLoad</h3>
        <div>{this.cdl}</div>
        <h3>Call local method</h3>
        <button class="blue" onClick={() => console.log(this.first)}>
          Log
        </button>
        <h3>Change Local State</h3>
        {this.count} -{' '}
        <button class="green" onClick={() => this.click()}>
          Click
        </button>
        <h3>Parse Array</h3>
        <div>{todosList}</div>
        <h3>Slotted Contents</h3>
        <slot>No Slotted Content</slot>
        <h3>Data</h3>
        {this.data ? this.data : 'No Data'}
        <h3>CSS</h3>
        <div class="blue">blue</div>
        <div class="green">green</div>
      </div>
    );
  }
}
