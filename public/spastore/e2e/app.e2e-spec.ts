import { SpastorePage } from './app.po';

describe('spastore App', () => {
  let page: SpastorePage;

  beforeEach(() => {
    page = new SpastorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
