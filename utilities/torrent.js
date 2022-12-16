import * as util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

export const commandExec = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      return stderr
    }
    return stdout

  } catch (error) {
    return error
  }
}
