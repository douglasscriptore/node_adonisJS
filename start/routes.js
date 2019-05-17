'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('reset_password', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)
/**
 * ROTAS AUTENTICADAS
 */
Route.group(() => {
  Route.get('files/:id', 'FileController.show')
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
