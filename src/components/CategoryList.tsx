import { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  onCategoryUpdated: () => void;
}

export function CategoryList({ categories, onCategoryUpdated }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .update({ name: editName })
      .eq('id', id);

    if (!error) {
      setEditingId(null);
      onCategoryUpdated();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría? Se eliminarán también todos los gastos asociados.')) {
      return;
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (!error) {
      onCategoryUpdated();
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
          {editingId === category.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="flex-1 p-1 border rounded mr-2"
            />
          ) : (
            <span className="flex-1">{category.name}</span>
          )}
          <div className="flex gap-2">
            {editingId === category.id ? (
              <>
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="p-1 text-green-600 hover:text-green-800"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(category)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}