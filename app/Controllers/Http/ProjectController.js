'use strict'

const Project = use('App/Models/Project')
class ProjectController {
  async index ({ request }) {
    // pegando paginação por parametro
    const { page } = request.get()
    // como é uma lista utilizamos o with
    const projects = await Project.query()
      .with('user')
      .paginate(page) // paginate é uma função nativa do adonis que faz paginação

    return projects
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    // como o project é unico utilizamos o metodo load
    await project.load('user')
    await project.load('tasks')
    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
