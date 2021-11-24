
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Avaliacao from 'App/Models/Avaliacao'
import StoreAvaliacaoValidator from 'App/Validators/StoreAvaliacaoValidator'

export default class AvaliacaosController {
  public async index ({}: HttpContextContract) {
    const avaliacaoDB = await Avaliacao.all()
    return avaliacaoDB
  }


  public async store ({request,auth}: HttpContextContract) {
    const data = await request.validate(StoreAvaliacaoValidator)
    const avaliacaoDB = await Avaliacao.create({...data, user_id: auth.user?.id})
    return avaliacaoDB  
  }

  public async show ({params,response}: HttpContextContract) {
    try{
      const avaliacaoDB = await Avaliacao.findOrFail(params.id)
      return avaliacaoDB
    }catch (error){
      response.status(400).send("Avaliacao não encontrada!!!")
    }
  }

  public async update ({params,response,request}: HttpContextContract) {
    const {nota}= await request.validate(StoreAvaliacaoValidator)
    try{
      const avaliacaoDB = await Avaliacao.findOrFail(params.id)
      avaliacaoDB.nota = nota
      await avaliacaoDB.save()
      return avaliacaoDB
     } catch (error){
       response.status(400).send("Avaliacao não encontrada!!!")
     }
  }

  public async destroy ({params,response}: HttpContextContract) {
    try{
      const avaliacaoDB = await Avaliacao.findOrFail(params.id)
      await avaliacaoDB.delete()
      return avaliacaoDB
      } catch (error){
        response.status(400).send("Avaliacao não encontrada!!!")
      }
    }
}
