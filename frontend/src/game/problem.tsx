import * as server_pb from 'mathgame/protobuf/server_pb'

export class Addition {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static from(problem: server_pb.Problem) {
    const addition = problem.getAddition()
    return new Addition(addition!.getX(), addition!.getY())
  }
}
