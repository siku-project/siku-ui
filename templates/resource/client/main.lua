-- Exemple : /siku_example ouvre l'interface.
RegisterCommand('siku_example', function()
  SikuUI.open({ title = 'Exemple SIKU' })
end, false)
