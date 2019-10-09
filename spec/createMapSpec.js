import createMap from '../public/scripts/map';

describe('The map creator', ()=>{
  it('should create a 2D array corresponding to size of the screen', ()=>{
    const map = createMap(800, 600, 2, 10);
    expect(map.length).toBe(80);
    expect(map[0].length).toBe(60);
  })
});