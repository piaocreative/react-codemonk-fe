/**
 * This File is Used in jest.config.json.
 * This File Helps in Configuring the Enzyme with React.
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener: () => {}, removeListener: () => {} }));
