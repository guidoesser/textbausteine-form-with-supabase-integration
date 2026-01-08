import React, { useState } from 'react'
import { Save, FileText, Tag, BookOpen, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { supabase, type Textbaustein } from '../lib/supabase'

export default function TextbausteinForm() {
  const [formData, setFormData] = useState<Omit<Textbaustein, 'id' | 'created_at'>>({
    textbaustein: '',
    keywords: [],
    topic: ''
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      // Parse comma-separated keywords into array
      const keywordsArray = keywordInput
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0)

      const dataToInsert = {
        textbaustein: formData.textbaustein,
        keywords: keywordsArray, // Will be automatically converted to JSONB by Supabase
        topic: formData.topic
      }

      const { data, error } = await supabase
        .from('textbausteine')
        .insert([dataToInsert])
        .select()

      if (error) throw error

      console.log('✅ Saved successfully as JSONB:', data)

      setStatus({ type: 'success', message: 'Textbaustein erfolgreich als JSON gespeichert!' })
      setFormData({ textbaustein: '', keywords: [], topic: '' })
      setKeywordInput('')
      
      setTimeout(() => setStatus(null), 5000)
    } catch (error: any) {
      console.error('Save error:', error)
      setStatus({ 
        type: 'error', 
        message: error.message || 'Fehler beim Speichern. Bitte versuchen Sie es erneut.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#9E7FFF] to-[#f472b6] mb-6 shadow-lg shadow-[#9E7FFF]/20">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Textbaustein erstellen
          </h1>
          <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto">
            Erstellen und verwalten Sie Ihre Textbausteine effizient und strukturiert
          </p>
        </div>

        {/* Status Messages */}
        {status && (
          <div className={`mb-6 p-4 rounded-2xl border ${
            status.type === 'success' 
              ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' 
              : 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
          } flex items-center gap-3 animate-slide-in`}>
            {status.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-[#262626] rounded-3xl shadow-2xl border border-[#2F2F2F] overflow-hidden">
          <div className="p-8 sm:p-12 space-y-8">
            {/* Textbaustein Field */}
            <div className="space-y-3">
              <label htmlFor="textbaustein" className="flex items-center gap-2 text-white font-semibold text-lg">
                <FileText className="w-5 h-5 text-[#9E7FFF]" />
                Textbaustein
              </label>
              <input
                type="text"
                id="textbaustein"
                required
                value={formData.textbaustein}
                onChange={(e) => setFormData(prev => ({ ...prev, textbaustein: e.target.value }))}
                className="w-full px-5 py-4 bg-[#171717] border-2 border-[#2F2F2F] rounded-2xl text-white placeholder-[#A3A3A3] focus:border-[#9E7FFF] focus:ring-4 focus:ring-[#9E7FFF]/20 transition-all duration-200 text-lg outline-none"
                placeholder="Geben Sie Ihren Textbaustein ein..."
              />
            </div>

            {/* Keywords Field */}
            <div className="space-y-3">
              <label htmlFor="keywords" className="flex items-center gap-2 text-white font-semibold text-lg">
                <Tag className="w-5 h-5 text-[#38bdf8]" />
                Keywords (als JSON gespeichert)
              </label>
              <input
                type="text"
                id="keywords"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="w-full px-5 py-4 bg-[#171717] border-2 border-[#2F2F2F] rounded-2xl text-white placeholder-[#A3A3A3] focus:border-[#38bdf8] focus:ring-4 focus:ring-[#38bdf8]/20 transition-all duration-200 text-lg outline-none"
                placeholder="keyword1, keyword2, keyword3..."
              />
              {keywordInput && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {keywordInput
                      .split(',')
                      .map(keyword => keyword.trim())
                      .filter(keyword => keyword.length > 0)
                      .map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#38bdf8]/20 to-[#38bdf8]/10 border border-[#38bdf8]/30 rounded-xl text-[#38bdf8] font-medium text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                  <div className="bg-[#171717] border border-[#2F2F2F] rounded-xl p-4">
                    <p className="text-xs text-[#A3A3A3] mb-2 font-semibold">JSON Preview:</p>
                    <pre className="text-[#10b981] text-sm font-mono">
                      {JSON.stringify(
                        keywordInput
                          .split(',')
                          .map(k => k.trim())
                          .filter(k => k.length > 0),
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Topic Field */}
            <div className="space-y-3">
              <label htmlFor="topic" className="flex items-center gap-2 text-white font-semibold text-lg">
                <BookOpen className="w-5 h-5 text-[#f472b6]" />
                Thema
              </label>
              <textarea
                id="topic"
                required
                rows={6}
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full px-5 py-4 bg-[#171717] border-2 border-[#2F2F2F] rounded-2xl text-white placeholder-[#A3A3A3] focus:border-[#f472b6] focus:ring-4 focus:ring-[#f472b6]/20 transition-all duration-200 text-lg outline-none resize-none"
                placeholder="Beschreiben Sie das Thema ausführlich..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-8 sm:px-12 pb-8 sm:pb-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#9E7FFF] to-[#f472b6] text-white font-bold py-5 px-8 rounded-2xl hover:shadow-2xl hover:shadow-[#9E7FFF]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Wird gespeichert...
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" />
                  Als JSON speichern
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-8 bg-[#262626]/50 border border-[#2F2F2F] rounded-2xl p-6 backdrop-blur-sm">
          <p className="text-[#A3A3A3] text-sm leading-relaxed">
            <strong className="text-white">Hinweis:</strong> Keywords werden jetzt als JSONB in der Datenbank gespeichert. 
            Das ermöglicht effiziente JSON-Operationen und Queries. Die Live-Vorschau zeigt das exakte JSON-Format.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
