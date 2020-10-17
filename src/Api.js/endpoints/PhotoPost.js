import React from 'react'

const PhotoPost = () => {
  const [token, setToken] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [peso, setPeso] = React.useState('')
  const [idade, setIdade] = React.useState('')
  const [img, setImg] = React.useState('')

  function handleClick(event){
    event.preventDefault();
    // console.log({username,email,password});

    const formData = new FormData();
formData.append('img',img)
formData.append('nome', nome)
formData.append('peso',peso)
formData.append('idade',idade)

    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(json => {
      console.log(json)
      return (json)
    })
  }

  return (
    <div>
      <input type="text" placeholder="token" value={token}
      onChange={({target}) => setToken(target.value)}/>
      <br />
      
      <input type="text" placeholder="nome" value={nome}
      onChange={({target}) => setNome(target.value)}/>
      <br />

      <input type="text" placeholder="peso" value={peso}
      onChange={({target}) => setPeso(target.value)}/>
      <br />
      
      <input type="text" placeholder="idade" value={idade}
      onChange={({target}) => setIdade(target.value)}/>
      <br />

      <input type="file"
      onChange={({target}) => setImg(target.files[0])}/>
      <br />

      <input type="submit" onClick={handleClick} />
      
    </div>
  )
}

export default PhotoPost
