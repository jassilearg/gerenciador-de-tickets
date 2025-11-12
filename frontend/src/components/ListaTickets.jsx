import './ListaTickets.module.css'
export default function ListaTickets({ titulo, tickets }) {
    return (
      <div style={{ flex: 1, padding: '10px' }}>
        <h2>{titulo}</h2>
        {tickets.length === 0 ? (
          <p>Nenhum ticket</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tickets.map((t) => (
              <li
                key={t.id}
                style={{
                  border: '1px solid #ccc',
                  marginBottom: '5px',
                  padding: '5px',
                  borderRadius: '4px'
                }}
              >
                <strong>{t.titulo}</strong><br />
                <small>{t.tipo_cliente}</small><br />
                <span>{t.descricao}</span><br />
                {t.urgencia_calculada && (
                  <small>Urgência: {t.urgencia_calculada}</small>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  