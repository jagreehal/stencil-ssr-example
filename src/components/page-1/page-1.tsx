import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-1',
  styleUrl: 'page-1.css',
  shadow: true
})
export class Page1 {
  render() {
    return <h2>I'm Page #1</h2>;
  }
}
