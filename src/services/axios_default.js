import axios from 'axios';
import { api } from '../actions/config';

export default axios.create({
    baseURL: api,
    headers: { 'Content-Type': 'application/json' }
});